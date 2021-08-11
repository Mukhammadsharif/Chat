import Edit  from '../static/edit.svg'
import Trash  from '../static/trash-2.svg'


export default function Private({ messagePrivate, id, setEditPrivate, setSelectPrivate }) {
    return (
        <div className='is-flex is-justify-content-space-around is-align-items-center my-3' id={id}>
            <div>
                <h3 className='is-size-4'>{messagePrivate}</h3>
            </div>

            <div>
                <span className='icon'
                  id={id}
                  onClick={() => setEditPrivate(id)}
            >
                <img src={Edit} alt={Edit}/>
            </span>
            </div>

            <div>
                <span
                className='icon'
                id={id}
                onClick={() => setSelectPrivate(id)}
            >
                <img src={Trash} alt={Trash}/>
            </span>
            </div>
        </div>
    )
}