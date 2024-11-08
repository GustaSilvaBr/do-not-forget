import { createRoot } from 'react-dom/client'
import './global.css'
import {Home} from './pages/home/Index';

createRoot(document.getElementById('root')!).render(
    <Home />
)
