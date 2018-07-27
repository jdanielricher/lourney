import React from 'react';
import "./SearchBar.css";

function SearchBar(props) {
    return (
        <div className="SearchBar">
            <form className="SearchBar_Form">
                <input
                    className="SearchBar__Input"
                    value={props.value}
                    onChange={props.onChange}
                />
                <button className="SearchBar__Button" onClick={props.onClick}>
                    search
                </button>
            </form>
        </div>
    );
}

// handleChange(filter) {
//     this.setState({ filterString: filter })
// }

// render() {
//     let coursesToDisplay = this.state.courses.filter((element, index) => {
//         return element.includes(this.state.filterString);
//     }).map((element, index) => {
//         return <h2 key={index}>{element}</h2>
//     })

//     return (
//         <div className="Input">
//             <input onChange={(e) => this.handleChange(e.target.value)} type="text" />
//             {coursesToDisplay}
//         </div>
//     );
// }
// }


export default SearchBar;