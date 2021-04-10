import React, { Component } from 'react'
import { render } from 'react-dom'
import { Icon, Header, Button } from 'semantic-ui-react'
import { Column } from 'react-virtualized'
import styled from 'styled-components'

import VirtualizedTable from './VirtualizedTable'
import Paginator from './Paginator'
import { getRows } from './utils'


const count = 100000
const rows = getRows(count)

const Wrapper = styled.div`
  margin: 10px;
`

const CountCell = ({ cellData }) => (
  <div>
    <Icon name='mail' color='green' />{cellData}
  </div>
)

class App extends Component {
  constructor() {
    super()
    this.state = { 
      page: 1, 
      perPage: 18, 
      scrollToIndex: undefined 
    }
    this.handleRowsScroll = this.handleRowsScroll.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handleRowsScroll({ stopIndex }) {
    this.setState(prevState => {
      const page = Math.ceil(stopIndex / prevState.perPage)
      return { page, scrollToIndex: undefined }
    })
  }

  handlePageChange(page) {
    this.setState(prevState => {
      const scrollToIndex = (page - 1) * prevState.perPage
      return { page, scrollToIndex }
    })
  }

  render() {
    const { page, perPage, scrollToIndex } = this.state

    const headerHeight = 30
    const rowHeight = 40
    const height = rowHeight * perPage + headerHeight
    const rowCount = rows.length
    const pageCount = Math.ceil(rowCount / perPage)

    return (
      <Wrapper>
        <Header as='h1'>React virtualized table with pagination</Header>
        <p>
          <Paginator
            pageCount={pageCount}
            currentPage={page}
            onPageChange={this.handlePageChange}
          />
        </p>
        <VirtualizedTable
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          height={height}
          rowCount={rowCount}
          rows={rows}
          onRowsRendered={this.handleRowsScroll}
          scrollToIndex={scrollToIndex}
          scrollToAlignment='start'
        >
          <Column label='Id' dataKey='id' width={100} /> 
          <Column label='Name' dataKey='name' width={250} /> 
          <Column label='Count' dataKey='count' width={100} cellRenderer={CountCell} />
        </VirtualizedTable>
      </Wrapper>
    )
  }
}

render(<App />, document.getElementById('root'));
