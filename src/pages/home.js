import React, { useEffect, useState, useContext } from "react";
import MovieCard from "./MovieCard";
import { getMovieData } from "./Service";
import { FirebaseContext } from "../context/firebase";
import { Button, Tabs, Tab, Toast } from "react-bootstrap";
import db from "../library/firebase.prod";

export default function HOME() {
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  const [fav, setFav] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [filteredMovieData, setFilteredMovieData] = useState([]);
  const [showToast, setShowToast] = useState([]);
  const [searchText, setSearchText] = useState("");
  const getAllMovieUsingGETHandler = async () => {
    const res = await getMovieData();

    if (res.Response === "True") {
      setMovieData(res.Search);
    } else {
      console.log("error");
    }
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (searchText !== null) {
      const filteredMovies = movieData.filter((item) => {
        return (
          item.Title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
      });
      setFilteredMovieData(filteredMovies);
    }
  };
  console.log(movieData);

  useEffect(() => {
    getAllMovieUsingGETHandler();
  }, []);
  useEffect(() => {
    db.collection("favs")
      .doc(user.uid)
      .collection("favlist")
      .onSnapshot((snapshot) => {
        console.log(snapshot, "snapshot");
        setFav(snapshot.docs.map((doc) => ({ data: doc.data() })));
      });
  }, [user]);

  const handleSubmit = (e) => {
    const { Title, Poster, Type, Year, imdbID } = e;
    console.log(Title, "title");

    if (!fav.find((o) => o.data.imdbID === imdbID)) {
      db.collection("favs").doc(user.uid).collection("favlist").add({
        Title: Title,
        Poster: Poster,
        Type: Type,
        Year: Year,
        imdbID: imdbID,
      });
      setShowToast(true);
    }
  };
  console.log(fav, "fav");
  return (
    <>
      <div className="page-container">
        <div className="page-top">
          <div className="top-left">Greetings! {user.displayName}</div>
          <div className="page-right">
            <Button onClick={() => firebase.auth().signOut()}>Sign Out</Button>
          </div>
        </div>
        <div className="page-inner">
          <Tabs
            defaultActiveKey="all-movies"
            transition={true}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="all-movies" title="All Movies">
              <div className="all-movies-sec">
                {movieData.map((item) => {
                  return (
                    <MovieCard
                      item={item}
                      onClick={() => handleSubmit(item)}
                      key={item.imdbID}
                    />
                  );
                })}
              </div>
            </Tab>
            <Tab eventKey="fav-movies" title="Favourite Movies">
              {fav.map((item, idx) => {
                return <MovieCard item={item.data} key={idx} />;
              })}
            </Tab>
            <Tab eventKey="search-movies" title="Search Movies" className='search'>
              <div className="page-search">
                <input
                  type="text"
                  value={searchText}
                  className="search-box"
                  placeholder="Search Movies"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="all-movies-sec">
                {filteredMovieData.map((item) => {
                  return (
                    <MovieCard
                      item={item}
                      onClick={() => handleSubmit(item)}
                      key={item.imdbID}
                    />
                  );
                })}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <Toast
        className="toast-style"
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
      >
        <Toast.Body>Wohoo movie has been added to your favorites!!</Toast.Body>
      </Toast>
    </>
  );
}
