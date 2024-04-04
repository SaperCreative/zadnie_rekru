import ChangeMode from '@/components/ui/changeMode';
import Data from './data/data';
import InputData from './data/inputData';

export default function Home() {

  return (
    <div className='container mx-auto my-8 py-2 rounded-md border'>
      <div className='h-[48px] flex items-center justify-between'>
        <div className='flex space-x-2 items-center'>
        <h1 className='py-10 text-2xl'>Tabela tagów</h1>
        <ChangeMode/>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <InputData/>
        </div>
      </div>
      <Data />
    </div>
  );
}
