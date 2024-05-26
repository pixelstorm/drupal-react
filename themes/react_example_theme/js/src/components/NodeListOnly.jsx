//https://drupalize.me/tutorial/use-react-list-content-drupal
import React, { useEffect, useState } from "react";


const NoData = () => (
  <div>No articles found.</div>
);

const NodeItem = ({drupal_internal__nid, title}) => (
  <div>
    <a href={`/node/${drupal_internal__nid}`}>{title}</a>
  </div>
);

function isValidData(data) {
  if (data === null) {
    return false;
  }
  if (data.data === undefined ||
    data.data === null ||
    data.data.length === 0 ) {
    return false;
  }
  return true;
}


const NodeListOnly = () => {
  const [content, setContent] = useState(false);

   
  useEffect(() => {
    const API_ROOT = '/jsonapi/';
    const url = `${API_ROOT}node/article?fields[node--article]=id,drupal_internal__nid,title,body&sort=-created&page[limit]=10`;

    const headers = new Headers({
      Accept: 'application/vnd.api+json',
    });

    fetch(url, {headers})
      .then((response) => response.json())
      .then((data) => {
  if (isValidData(data)) {
      setContent(data.data)
    }
      })

      .catch(err => console.log('There was an error accessing the API', err));
  }, []);


  return (
    <div>
      <h2>Site content</h2>

    {content ? (
      content.map((item) => <NodeItem key={item.id} {...item.attributes}/>)
    ) : (
      <NoData />
      )}
    </div>
  );
};

export default NodeListOnly;

