//props: title & description,breadCrumb
export default function CardInfoOne(props) {

    let title = () => {
        return (
            <div className="item one">
                <span style={{ fontSize: '14px', textDecoration: 'underline' }}>{props.breadCrumb}</span>/<b>{props.title}</b>
            </div>
        );
    };

    let description = () => {
        return (<div className="item two">{props.description}</div>);
    };

    return (
        <section className="sec one">
            <div className="level one">
                {title()}
                {description()}
            </div>
        </section>
    );
}