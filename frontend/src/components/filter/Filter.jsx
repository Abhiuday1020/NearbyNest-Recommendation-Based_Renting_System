import './filter.scss'

function Filter(){
  return (
    <div className="filter">
      <h1>Search results for <b>Dehradun</b></h1>
      <div className="top">
        <div className="item">
          
          <input type="text" id="city" name="city" placeholder='City Location' />
        </div>
        <div className="right">
        <button>
          <img src="/search.png" alt="" />
        </button>
        </div>
        
      </div>
      
    </div>
  );
}
export default Filter