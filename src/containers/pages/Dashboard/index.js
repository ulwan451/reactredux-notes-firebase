import React, { Component, Fragment } from "react";
import "./Dashboard.scss";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataAPI,
  deleteDataAPI
} from "../../../config/redux/action";
import { connect } from "react-redux";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "SIMPAN",
    noteId: ""
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
  }

  handleSaveNotes = () => {
    const { title, content, textButton, noteId } = this.state;
    const { savedNotes, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid
    };
    if (textButton === "SIMPAN") {
      savedNotes(data);
    } else {
      data.noteId = noteId;
      updateNotes(data);
    }
    console.log(data);
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value
    });
  };

  updateNotes = note => {
    console.log(note);
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "UPDATE",
      noteId: note.id
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "SIMPAN"
    });
  };

  deleteNote = (e, note) => {
    e.stopPropagation();
    const { deleteNote } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      noteId: note.id
    };
    deleteNote(data);
  };

  render() {
    const { title, content, textButton } = this.state;
    const { updateNotes, cancelUpdate, deleteNote } = this;
    const { notes } = this.props;
    console.log("notes", notes);
    return (
      <div className="container">
        <h4
          className="text-center p-3 border-bottom"
          style={{ color: "purple" }}
        >
          NOTE APP
        </h4>
        <div className="input-form">
          <input
            className="input-title shadow"
            onChange={e => this.onInputChange(e, "title")}
            placeholder="Title"
            value={title}
          />
          <textarea
            className="input-content shadow"
            onChange={e => this.onInputChange(e, "content")}
            placeholder="Content"
            value={content}
          ></textarea>
          <div className="action-wrapper">
            {textButton === "UPDATE" ? (
              <button
                // onClick={this.handleSaveNotes}
                onClick={cancelUpdate}
                className="save-btn cancel"
              >
                Cancel
              </button>
            ) : (
              <div />
            )}

            <button onClick={this.handleSaveNotes} className="save-btn">
              {textButton}
            </button>
          </div>
        </div>
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {notes.map(note => {
              return (
                <div
                  className="card-content"
                  key={note.id}
                  onClick={() => updateNotes(note)}
                >
                  <p className="title">{note.data.title}</p>
                  <p className="date">{note.data.date}</p>
                  <p className="content">{note.data.content}</p>
                  <div
                    className="delete-btn"
                    onClick={e => deleteNote(e, note)}
                  >
                    x
                  </div>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const reduxState = state => ({
  userData: state.user,
  notes: state.notes
});

const reduxDispatch = dispatch => ({
  savedNotes: data => dispatch(addDataToAPI(data)),
  getNotes: data => dispatch(getDataFromAPI(data)),
  updateNotes: data => dispatch(updateDataAPI(data)),
  deleteNote: data => dispatch(deleteDataAPI(data))
});

export default connect(
  reduxState,
  reduxDispatch
)(Dashboard);
