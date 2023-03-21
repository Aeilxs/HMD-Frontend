import { Alert, Button, Container, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { createAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { admin_deleteAllCategories, admin_fetchCategories } from '../../reducers/admin/adminMiddleware';
import {
  admin_selectCategoriesStatus,
  admin_selectCategoriesMessage,
  admin_selectTries,
  admin_selectProgress,
  admin_selectPostCategoriesMessage,
  setIsCategoriesUpdated,
  admin_selectPostCategoriesStatus,
  admin_selectIsUpdated,
} from '../../reducers/admin/adminSlice';
import MessageBox from '../../shared/MessageBox/MessageBox';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function AdminPage(): JSX.Element {
  const categoriesStatus = useAppSelector(admin_selectCategoriesStatus);
  const tries = useAppSelector(admin_selectTries);
  const { severity, message } = useAppSelector(admin_selectCategoriesMessage);
  const { severity: severityPost, message: messagePost } = useAppSelector(admin_selectPostCategoriesMessage);
  const categoriesPostStatus = useAppSelector(admin_selectPostCategoriesStatus);
  const progress = useAppSelector(admin_selectProgress);
  const isUpdated = useAppSelector(admin_selectIsUpdated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categoriesStatus === 'rejected') {
      setTimeout(() => dispatch(admin_fetchCategories()), 1000);
    }
  }, [categoriesStatus, dispatch, tries]);

  return (
    <Container>
      <MessageBox
        title="Mise à jour des catégories"
        content="Faire cette requête dans des heures plutôt creuses est l'idéal"
      />
      {message && (
        <Alert
          sx={{ my: 2 }}
          severity={severity}
        >
          {message}
        </Alert>
      )}

      <Box sx={{ textAlign: 'center', my: 2 }}>
        {categoriesStatus === 'pending' ? (
          <LinearProgress sx={{ p: 1, my: 1, borderRadius: '5px' }} />
        ) : (
          <>
            <Button
              sx={{ my: 2 }}
              disabled={categoriesStatus !== 'idle' || isUpdated}
              onClick={() => {
                dispatch(admin_fetchCategories());
              }}
              variant="contained"
            >
              mise à jour 1/2
            </Button>
            <br />
          </>
        )}
        {isUpdated && 'Les catégories ont déjà été mises à jour.'}
        {tries > 0 && categoriesStatus !== 'fulfilled' && categoriesStatus !== 'idle' && (
          <Typography sx={{ my: 1 }}>Tentatives: {tries}</Typography>
        )}
        {categoriesStatus === 'fulfilled' && (
          <>
            <Alert
              sx={{ my: 2 }}
              severity="success"
            >
              Vous pouvez désormais terminer la procédure de mise à jour
            </Alert>
            <Button
              disabled={categoriesPostStatus !== 'idle'}
              onClick={() => {
                dispatch(admin_deleteAllCategories());
              }}
              variant="contained"
            >
              mise à jour 2/2
            </Button>
            <Box sx={{ my: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <LinearProgress
                sx={{ p: 1, width: '100%', borderRadius: '5px' }}
                variant="determinate"
                value={progress}
              />
              <Typography sx={{ ml: 1 }}>{progress} %</Typography>
              {messagePost && (
                <>
                  <Alert
                    sx={{ width: '100%' }}
                    severity={severityPost}
                  >
                    {messagePost}
                  </Alert>
                  <Button
                    sx={{ my: 2 }}
                    onClick={() => {
                      dispatch(createAction('admin/resetState')());
                      dispatch(setIsCategoriesUpdated(true));
                    }}
                    variant="contained"
                  >
                    Fin de la procédure
                  </Button>
                </>
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
