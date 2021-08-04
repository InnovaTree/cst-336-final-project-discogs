  /**
   * Originally part of a module and currently unused. We
   * were attempted to work on functions individually and
   * include them in the scripts for multiple pages.
   * 
   * Issues fetch request to collection API to retrieve all
   * albumids associated with the current user.
   * @returns {object} JSON output
   */
async function getCollection(){
  let url= `/api/collection/getcollection`;
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

export{getCollection};