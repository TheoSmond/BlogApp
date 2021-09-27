import React from 'react';
import PostsList from './PostsList'

class App extends React.Component {
    render() {
        return (
            <>
                <h1>Hello From App component</h1>
                <PostsList/>
            </>
        )
    }
}

export default App;