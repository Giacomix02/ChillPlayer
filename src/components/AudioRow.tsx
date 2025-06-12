export default function AudioRow(props:Music){
    return (
        <div>
            <textarea>{props.getTitle()}</textarea>
            <textarea>{props.getArtist()}</textarea>
            {/*add a button to add to a playlist*/}
            {/*add a button to play the audio*/}
        </div>
    );
}