
import styled from 'styled-components'
import icons from '../assets/icons.webp'
const Item = ({ setToRemove, current, select, update, fullData, index }) => {
    const onClickItem = (item) => {
        select(item.firstName)
        fullData[index].selected = true;
        update(fullData);
        setToRemove(index);

    }

    return (<div onClick={(e) => onClickItem(current)}><OneItem className={current.selected ? "selected" : ""}>
        <span className={`icons ${current.selected ? "selected" : ""}`}></span>
        {current.firstName}</OneItem></div>)
}

const OneItem = styled.p`
&:hover{
    background-color:lightgray;
}
cursor:pointer;
margin:0px;
padding:7px 5px 7px 40px ;
&.selected{
    color:purple;
}
position: relative;
span{
    margin:0px;
    padding-left:10px;
    width:20px;
    height:20px;
    position:absolute;
    left:0px;
    top:5px;
    background-repeat: no-repeat;
    background-position: 10px 0px;
    background-size:20px;
    background-image:url(${icons});
    &.selected{
        background-position: 10px -20px ;
        
    }
}
`


export default Item