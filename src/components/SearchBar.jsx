import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import Item from './Item'
import magnify from '../assets/magnifying.svg'
import mic from '../assets/mic.svg'
import removeIcons from '../assets/x.svg'
import { getDataFromApi } from '../utils'
import { consts } from '../consts'
import loaderSrc from '../assets/loader.gif'
import fakeResults from '../results.json'
const SearchBar = ({ users }) => {


    const [mainInput, setMainInput] = useState("")
    const [data, setData] = useState([])
    const [inputFocus, setInputFocus] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(null)
    const [results, setResults] = useState([])
    const [timeForResults, setTimeForResults] = useState(null)
    const [showLoader, setShowLoader] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])
    const updateList = (value) => {
        setMainInput(value);
        filterData(value)
        setCurrentIndex(null)
    }
    useEffect(() => {
        setData(users)
    }, [users])
    useEffect(() => {
        if (currentIndex != null) {
            getResults(currentIndex)
        }

    }, [currentIndex])

    const filterData = (str) => {
        str = str.toLowerCase()
        const updatedData = users.filter((current) => {
            return current.firstName.toLowerCase().startsWith(str)
        })
        setData(updatedData)
    }
    const onOutOfInput = () => {
        setTimeout(() => {
            setInputFocus(false)
        }, 500)
    }

    const removeSelectionHistory = () => {
        const tempData = data;
        tempData[currentIndex].selected = false;
        setData(tempData)
        setCurrentIndex(null)
    }

    const onFocusInput = () => {
        setInputFocus(true)
        updateList(mainInput)
    }

    const getResults = async (id) => {
        setResults([])
        let elapsed = Date.now()
        setShowLoader(true)
        const results = await getDataFromApi(`${consts.fakeLink}/${id}`)
        if (results && results.length > 0) {
            await setTimeForResults(Math.round((Date.now() - elapsed) / 1000))
            setResults(results)
            setShowLoader(false)
        } else {
            await setTimeForResults(Math.round((Date.now() - elapsed) / 1000))
            setResults(fakeResults.results)
            setShowLoader(false)
        }
    }

    return (
        <>
            {showLoader && <Loader />}
            <InputCont>

                <MainInput ref={inputRef} onBlur={() => onOutOfInput()} onFocus={() => onFocusInput()} value={mainInput} onChange={(e) => updateList(e.target.value)} type="text" />
                {currentIndex != null && <span onClick={() => removeSelectionHistory()} className="removeIcon"></span>}
                {inputFocus && mainInput != "" &&
                    <SelectDropdown>
                        {data.map((current, index) => (<Item key={uuidv4()} setToRemove={setCurrentIndex} select={setMainInput} current={current} update={setData} fullData={data} index={index} />))}
                    </SelectDropdown>
                }
            </InputCont>
            <ResultsCont>
                {currentIndex != null && results && results.length > 0 &&
                    <>
                        <p>Number of results {results.length} Time for results: {timeForResults}s</p>
                        {
                            results.map((current) => (
                                <div key={uuidv4()}>
                                    <a href={current.link}>{current.title}</a>
                                    <p>{current.desc}</p>
                                    {current?.sub.map((subCurrent) => (
                                        <OneResult key={uuidv4()}>

                                            <a href={subCurrent.link}>{subCurrent.title}</a>
                                            <p>{subCurrent.desc}</p>
                                        </OneResult >

                                    ))}
                                </div>
                            ))
                        }
                    </>
                }
            </ResultsCont>
        </>
    )
}

const MainInput = styled.input`
width:100%;
border-radius:20px;
border:none;
height:40px;
font-size:20px;
padding-left:80px;

&:hover {
    box-shadow:1px 1px 10px 1px lightgray;
}
&:focus{
    font-size:20px;
    border:none;
    box-shadow:none;
    border-bottom-left-radius:0px;
    border-bottom-right-radius:0px;
}
&:focus-visible{
    border:none;
    box-shadow:none;
    outline:none;
    border-bottom-left-radius:0px;
    border-bottom-right-radius:0px;
}
&:active{
    border:none;
    box-shadow:none;
    outline:none;
    border-bottom-left-radius:0px;
    border-bottom-right-radius:0px;
}
`
const none = "none"
const InputCont = styled.div`
width:100%;
display:flex;
align-items:center;
flex-direction:column;
width:50%;
border:1px solid lightgray;
box-shadow:2px 2px 10px 2px lightgray;
border-radius:20px;
overflow:hidden;
position:relative;

&::before{
content:url('${magnify}');
width: 20px;
height: 20px;
position: absolute;
left: 20px;
top: 23px;
transform: translate(-50%, -50%);
position:absolute;
}
&::after{
content:url('${mic}');
width: 20px;
height: 20px;
position: absolute;
right: 20px;
top: 23px;
transform: translate(-50%, -50%);
position:absolute;
}
.removeIcon{
    width:20px;
    height:20px;
    background-image:url(${removeIcons});
    position:absolute;
    right:60px;
    top:12px;
    cursor:pointer;

}

`
const SelectDropdown = styled.div`
width:100%;
max-height: 350px;
overflow:hidden;
`

const ResultsCont = styled.div`
width:50%;
border-top:1px solid lightgray;
margin-top:30px;
padding-top:0px;
>div{
display:flex;
flex-direction:row;
flex-wrap:wrap;
}
>p{
    margin-top:10px;
    color:gray;
    font-size:13px;
}
`
const OneResult = styled.div`
width:40%;
padding:10px;
font-size:15px;
p{
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    margin-top:10px;
}

`

const Loader = styled.div`
width:50px;
height:50px;

position:absolute;
left:50%;
top:50%;
transform:translate(-50%,-50%);
background-image:url(${loaderSrc});
background-size:50px;
background-repeat:no-repeat;

`
export default SearchBar