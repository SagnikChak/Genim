import React, { useState, useEffect } from 'react';

import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if(data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#aaacff] text-xl uppercase">{title}</h2>
  );
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        const response = await fetch("https://genim.onrender.com/api/v1/post", {
          method: "GET",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "https://genim.onrender.com",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
          },
        });

        if(response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

        setSearchedResults(searchResults);
      }, 500)
    );
  };
  
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#d0d0d0] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#8b8b8b] text-[16px] max-w-[1000px]">
          Browse through a collection of imaginative and visually stunning
          images.
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search Posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#8b8b8b] text-xl mb-3">
                Showing Results for{" "}
                <span className="text-[#d0d0d0]">{searchText}</span>
              </h2>
            )}

            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={searchedResults} title="No Search Results Found!!" />
              ) : (
                <RenderCards data={allPosts} title="No Posts Found!!" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;