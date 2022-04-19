import { useEffect, useState } from "react";

import 'assets/css/table-container/table-container.css';

import { SpinnerLoader } from "components/AcademyCourseCard/CardContainer";
import SearchBar from "components/SearchBar/SearchBar";

function StudentTableRow(props) {
    let [state, setState] = useState({
        index: props.index,
        view: props.view
    });


    return (
        <tr key={`studentRow${state.index}`}>
            <td key={`studentRow${state.index}Col${1}`}>{state.view[2]}</td>
            <td key={`studentRow${state.index}Col${2}`}>{state.view[3]} {state.view[4]}</td>
            <td key={`studentRow${state.index}Col${3}`}>{(state.view[5].endsWith('*')) ? state.view[5].substring(0, state.view[5].length - 1) : state.view[5]}</td>
            <td key={`studentRow${state.index}Col${4}`}>{state.view[6]}</td>
        </tr>
    );
}

export default function StudentView(props) {

    let [state, setState] = useState({ data: null });

    useEffect(() => {
        props.getData().then((data) => {
            setState({ data: data });
        });
    }, [props]);


    let getRows = () => {
        let data = state.data;
        console.log(data);

        let rows = [];

        if (data) {
            if (data[Symbol.iterator]) {
                data.forEach((view, index) => {
                    if (index) {
                        rows.push(
                            <StudentTableRow key={`studentRowComp${index}`} index={index} view={view} />
                        );
                    }
                });
            }
        } else {
            return (
                <tr>
                    <td>
                        <SpinnerLoader />
                    </td>
                </tr>
            );
        }

        return rows;
    }


    return (
        <>
            <SearchBar course onSearch={() => { }} />
            <div className="table-container">
                <table>
                    <tbody>
                        <tr>
                            <td>Student ID</td>
                            <td>Student Name</td>
                            <td>Mobile Number</td>
                            <td>Enrolled Course</td>
                        </tr>
                        {getRows()}
                    </tbody>
                </table>
            </div>
        </>
    )
}