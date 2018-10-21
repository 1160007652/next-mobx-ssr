import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (<Layout>
        <h1>Batman TV Shows</h1>
        <ul>
            {props.listData.map(({ show }) => (
                <li key={show.id}>
                    <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                        <a>{show.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
        <img src="/static/images/start.png" alt="start image" />
        <style jsx>{`
        h1, a {
            font-family: "Arial";
        }

        ul {
            padding: 0;
        }

        li {
            list-style: none;
            margin: 5px 0;
        }

        a {
            text-decoration: none;
            color: blue;
        }

        a:hover {
            opacity: 0.6;
        }
    `}</style>
    </Layout>
)

export default Index