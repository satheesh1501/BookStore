import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} =useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setTitle(res.data.title);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened, Please check console");
        console.log(error);
      });
  }, []);
  const handleEditBook = () =>{
  const data = {
    title,
    author,
    publishYear,
  };
  setLoading(true);
  axios
      .put(`http://localhost:5000/books/${id}`,data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited Successfully', { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        
        enqueueSnackbar('Error', {variant: 'error'});//alert("An error happened, Please check console");
        console.log(error);
      });
  };
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner/> : ''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Title</span>
          <input 
            type='text'
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Author</span>
          <input 
            type='text'
            value={author}
            onChange={(e)=> setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>PublishYear</span>
          <input 
            type='number'
            value={publishYear}
            onChange={(e)=> setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
            Save
          </button>
          </div>
          </div>
  )
}

export default EditBook;