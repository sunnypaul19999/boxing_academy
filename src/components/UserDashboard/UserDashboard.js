import { Outlet } from 'react-router-dom';

import UIToolbar from 'components/UIToolbar/UIToolbar';
import SetupContainer from 'components/SetupContainer/SetupContainer.js';

//<SearchBar academy />
export default function UserDashboard(props) {
    return (
        <>
            <UIToolbar userF />
            <SetupContainer>
                <Outlet />
            </SetupContainer>
        </>
    );
}