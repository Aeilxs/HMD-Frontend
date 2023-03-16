import { AlertColor } from '@mui/material';
import { AlertMessage } from '../Interfaces/AlertMessage';

export const alertCreator = (severity: AlertColor, message: string): AlertMessage => ({ severity, message });
