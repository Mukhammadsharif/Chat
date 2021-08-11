import Edit  from '../static/edit.svg'
import Trash  from '../static/trash-2.svg'


export default function Message({ message, id, setEdit, setSelect }) {
    return (
        <div className='is-flex is-justify-content-space-around is-align-items-center my-3' id={id}>
            <div>
                <h3 className='is-size-4'>{message}</h3>
            </div>

            <div>
                <span className='icon'
                  id={id}
                  onClick={() => setEdit(id)}
            >
                <img src={Edit} alt={Edit}/>
            </span>
            </div>

            <div>
                <span
                className='icon'
                id={id}
                onClick={() => setSelect(id)}
            >
                <img src={Trash} alt={Trash}/>
            </span>
            </div>
        </div>
    )
}