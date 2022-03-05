import AcademyCourseCard from './AcademyCourseCard';


export default function GridAcademyCourseCard(props) {

    let d = () => {
        console.log('GridAcademyCourseCard');
        return (<AcademyCourseCard {...props} />);
    }
    return (
        d()
    );
}