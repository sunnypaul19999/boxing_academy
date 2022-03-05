import 'assets/css/setup-container/setup-container.css';

//-----------childrens-----------
//CardContainer & SearchBar component
//---------------------------
export default function SetupContainer(props) {

    return (
        <div class="setup-container">
            {props.children}
        </div>
    );
}