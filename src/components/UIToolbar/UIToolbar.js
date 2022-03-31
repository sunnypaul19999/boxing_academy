import ToolbarMenu from './ToolbarMenu';

import 'assets/css/ui-toolbar/main-ui-toolbar-media-query.css';

//props: admin | user
function UIToolbar(props) {

    let appName = () => {
        return (
            <span className="toolbar-item app-name"><b>Boxing Academy</b></span>
        );
    }

    let logout = () => {
        return (
            <span className="toolbar-item logout" id="logout">
                <span className="material-icons"> logout </span>
            </span>
        );
    }

    let toolbarType = () => {
        if (props.admin) return 'admin';
        return 'user';
    }


    let toolbar = () => {
        return (
            <div className="component-ui-toolbar">
                <div className="card">
                    <div className="card-body">
                        <span className={`${toolbarType()} toolbar`}>
                            <section className="sec-1">{appName()}</section>
                            <section className="sec-2">{logout()}</section>
                            <ToolbarMenu {...props} />
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return toolbar();
}

export default UIToolbar;