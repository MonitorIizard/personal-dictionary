import Image from 'next/image'
import "@/app/globals.css"

export default function Home() {
  return (
    // <div className='card'>
    //   <h1>Hello world</h1>
    // </div>
    <Image src={"https://picsum.photos/200/281"} alt='place holder'
           width={0} height={0} 
           sizes='100vw' 
           style={{width : '100%', height : '281px' }}/>
  )
}
