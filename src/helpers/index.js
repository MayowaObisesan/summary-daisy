export const deviceWidthEnum = {
    "desktopLarge": 1440,
    "desktop": 1200,
    "laptopLarge": 1024,
    "laptop": 992,
    "tablet": 768,
    "phone": 600
}

function customClassNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const convertToBullets = (text) => {
    // create a new ul element
    let ul = document.createElement("ul");
    // split the string by newline characters
    let lines = text.split("\n");
    // loop through each line
    for (let line of lines) {
        // check if the line starts with a dash
        if (line.startsWith("-")) {
            // create a new li element
            let li = document.createElement("li");
            // set the text content of the li element to the line without the dash
            li.textContent = line.slice(1).trim();
            // append the li element to the ul element
            ul.appendChild(li);
        }
    }
    // return the ul element
    return ul;
}

export function ConvertToUl(str) {
    // create a new ul element
    let ul = document.createElement("ul");
    // split the string by newline characters
    let text = str.replaceAll(" - ", ". - ");
    let lines = text.split(". ");
    console.log(lines);
    // loop through each line
    for (let line of lines) {
        // check if the line starts with a dash
        if (line.startsWith("- ")) {
            // create a new li element
            let li = document.createElement("li");
            // set the text content of the li element to the line without the dash
            li.textContent = line.slice(1).trim();
            // append the li element to the ul element
            ul.appendChild(li);
        }
    }
    // return the ul element
    return ul.innerHTML;
}
export function ConvertToList({ str }) {
    // create a new ul element
    console.log(str);
    // let ul = document.createElement("ul");
    // split the string by newline characters
    let text = str.replaceAll(" - ", ". - ");
    let lines = text.split(". ");
    console.log(lines);
    let listItems = [];
    // loop through each line
    for (let line of lines) {
        // check if the line starts with a dash
        // if (line.startsWith("-")) {
        listItems.push(<li>{line.slice(1).trim()}</li>);
        // }
    }
    // return the ul element
    console.log(listItems);
    return <ul className="list-disc">{listItems}</ul>;
}

export function truncateLetters(text, start, stop) {
    try {
        // consoler.innerHTML += "truncate_letters";
        start = Number(start);
        stop = Number(stop);
        text = text?.toString();
        let text_split = text?.split('');
        /*
        * Don't use splice in the below scenario, use slice instead.
        * Splice changes text_split.length to the text_split.length - stop which if;
        * text_split.length == 118 and stop = 80, text_split.splice(start, stop) changes the value to 38 when
        * subtracting the stop value from the text_split.length value below. */
        // let text_split_splice = text_split?.splice(start, stop)
        let text_split_splice = text_split?.slice(start, stop)
        // let text_split_splice_string = text_split_splice.toString();
        let truncated_letters = text_split_splice?.join('')
        // consoler.innerHTML += " Word Truncated :" + truncated_letters;
        return (text_split?.length > stop) ? truncated_letters + '...' : truncated_letters;
    } catch (err) {
        alert('TRUNCATE LETTERS ERROR:' + err)
    }
}

export function truncateWords(text, start, stop) {
    try {
        // consoler.innerHTML += "truncate_words";
        start = Number(start)
        stop = Number(stop)
        text = text?.toString();
        let text_split = text.split(' ')
        let text_split_splice = text_split.splice(start, stop)
        // let text_split_splice_string = text_split_splice.toString();
        let truncated_words = text_split_splice.join(' ')
        // consoler.innerHTML += " Word Truncated :" + truncated_words;
        return Number(text_split.length) > stop ? truncated_words + '...' : truncated_words
    } catch (err) {
        alert('TRUNCATE WORDS ERROR:' + err)
    }
}
