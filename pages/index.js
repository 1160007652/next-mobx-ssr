
import React from 'react'
import Head from 'next/head'
import Page from '../containers/Page'
import Home from '../containers/Home'

export default class Counter extends React.Component {
    static getInitialProps = async function () {
        const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
        const data = await res.json()
    
        console.log(`Show data fetched. Count: ${data.length}`)
        return {
            shows: data
        }
    }
    render () {
        return (
            <React.Fragment>
                <Head>
                    <title>首页</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Page title='Index Page' linkTo='/other' />
                <Home listData={this.props.shows}/>
            </React.Fragment>
        )
    }
}