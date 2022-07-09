
import { useEffect, useState } from 'react'

import SearchBar from './components/SearchBar'
import styled from 'styled-components'
import logo from './assets/google_logo.svg'
import jObj from './moke.json'
import { consts } from './consts'
import { getDataFromApi } from './utils'


function App() {
  const [list, setList] = useState([])
  useEffect(() => {
    updateData()

  }, [])

  const updateData = async () => {
    const results = await getDataFromApi(consts.listApi)
    if (results && results.length > 0) {
      updateList(results)
    } else {
      updateList(jObj.users)
    }

  }
  const updateList = (users) => {
    if (users && users.length > 0) {
      users.map((current) => { current.selected = false })
    }
    setList(users)
  }
  return (
    <AppBlock className="App">
      <header className="App-header">
      </header>
      <img src={logo} />
      <SearchBar users={list} />

    </AppBlock>
  );
}
const AppBlock = styled.div`
display: flex;
flex-direction:column;
jestify-contnet:center;
align-items:center;
img{
  margin:40px 0px;
  width: 20%;
  height: 100%;
}
`

export default App;
