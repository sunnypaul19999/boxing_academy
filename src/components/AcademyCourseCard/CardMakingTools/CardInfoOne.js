//props: title & description
export default function CardInfoOne(props) {

    let title = () => {
        return (
            <div className="item one">
                <b>{props.title}</b>
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