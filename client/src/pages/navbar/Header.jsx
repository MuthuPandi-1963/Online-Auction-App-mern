import logo from '../../assets/logo.png'
export default function Header() {
    return(
        <div className="flex items-center">
        <img src={logo} alt="" className='w-10 h-10 object-cover' />
        <h1 className='tracking-tight font-black text-2xl'>Bid Deal</h1>
        </div>
    )
}