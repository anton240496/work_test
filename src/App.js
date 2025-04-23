
import { useState, useMemo } from 'react';
import $ from 'jquery';


// Ввод данных
const Form = ({ add, oid }) => {


  const [val, setVal] = useState('')
  const [bool, setbool] = useState('')

  //пропишем логику
  //выполнение / отмена всех задач
  $('input[name="select_all"]').on('change', function () {
    if ($(this).is(':checked')) {
      $('#activities').find('input[type="checkbox"]')
        .prop('checked', true)
        .change();
      $('.gotovo').addClass('gotovo_act');
      $('.prosmotr_all').css('color', 'black');
      $('.prosmotr').css('color', 'black');
      $('.prosmotr_none').css('color', 'black');
      return;
    } else {
      $('#activities').find('input[type="checkbox"]')
        .prop('checked', false)
        .change();
      $('.gotovo').removeClass('gotovo_act');
      return;
    }
  });

  //фильтр /просмотр только выполненых задач
  $('.prosmotr').on('click', function () {
    $('.blocks').addClass('blocks_none');
    $('.selected').addClass('selected_act');
    $('.selected').removeClass('selected_none');
    $('.prosmotr_all').css('color', 'black');
    $('.prosmotr').css('color', 'green');
    $('.prosmotr_none').css('color', 'black');
    $('.selected').css('display', 'block');
    $('.blocks_none:not(.selected)').css('display', 'none');
  });
  //фильтр /просмотр всех задач
  $('.prosmotr_all').on('click', function () {
    $('.selected').removeClass('selected_act');
    $('.selected').removeClass('selected_none');
    $('.blocks').removeClass('blocks_none');
    $('.prosmotr_all').css('color', 'green');
    $('.prosmotr').css('color', 'black');
    $('.prosmotr_none').css('color', 'black');
    $('.selected').css('display', 'block');
    $('.blocks').css('display', 'block');
  });
  //фильтр /просмотр только не выполненых задач
  $('.prosmotr_none').on('click', function () {
    $('.blocks').removeClass('blocks_none');
    $('.selected').removeClass('selected_act');
    $('.selected').addClass('selected_none');
    $('.prosmotr_all').css('color', 'black');
    $('.prosmotr').css('color', 'black');
    $('.prosmotr_none').css('color', 'green');
    $('.blocks').css('display', 'block');
    $('.selected').css('display', 'none');

  });

  $('.dobav').on('click', function () {
    $('.select_alls').addClass('select_alls_act');
    $('.gotovo').removeClass('gotovo_act');
    $(".select_allss").prop("checked", false);
    $('.prosmotr').css('display', 'block');
    $('.prosmotr_all').css('display', 'block');
    $('.prosmotr_none').css('display', 'block');
    $('.blocks').removeClass('blocks_none');
    $('.selected').removeClass('selected_act');
    $('.prosmotr_all').css('color', 'black');
    $('.prosmotr').css('color', 'black');
    $('.prosmotr_none').css('color', 'black');
    $('.selected').css('display', 'block');
    $('.blocks').css('display', 'block');
  });


  //при готовности задачи показывать, что она готова
  $('#activities').on('change', 'input[type="checkbox"]', function () {
    if ($(this).is(':checked')) {
      $(this).closest('li').addClass('selected');
      var len = $("input[name='activities[]']:checked").length;
      console.log("l=" + len);
      var max = 0,
        cv = 0;
      $('input').each(function () {
        cv = $(this).val() * 1;
        max = max < cv ? cv : max;

      });
      console.log("m=" + max)
      //если задачи выполнены вывести надпись о выполение всех задач
      if (len === max && len != 0) {
        $('.gotovo').addClass('gotovo_act');
        $(".select_allss").prop("checked", true);
        $('.blocks').removeClass('blocks_none');
        $('.selected').removeClass('selected_act');
        $('.selected').css('display', 'block');
        $('.prosmotr_all').css('color', 'black');
        $('.prosmotr').css('color', 'black');
        $('.prosmotr_none').css('color', 'black');
      } else {
        $('.gotovo').removeClass('gotovo_act');
      }
    } else {
      $(this).closest('li').removeClass('selected');
      $('.gotovo').removeClass('gotovo_act');
      $(".select_allss").prop("checked", false);
      $('.prosmotr').addClass('prosmotrs');
      $('.prosmotr_all').css('color', 'black');
      $('.prosmotr').css('color', 'black');
      $('.prosmotr_none').css('color', 'black');
      $('.selected_none').css('display', 'block');
    }

  });


  // Добавление задачи

  const act = e => setVal(e.target.value)
  const ins = e => {
    e.preventDefault()
    if (val === '') {
      alert('Укажите текст сообщения')
      return
    }
    add(a => [...a, { id: oid.id, title: val, bool: false }])

    oid.setId(v => v + 1)

    setVal('')
    setbool('')
  }
  return (
    <div>
      <form className='flex gap-4 flex-wrap'>
        <input className='border border-gray-800 rounded-xl p-2' value={val} onChange={act} placeholder='Введите задачу' />
        <button className='dobav text-xl' onClick={ins} >Добавить задачу</button>

      </form>
      <p className='gotovo flex justify-center text-3xl border-2 border-gray-800 mt-2'>Все задачи выполнены</p>
    </div>
  );
};
// Список
const List = ({ arr }) => {


  const [checked, setChecked] = useState(true);
  return (
    <div>
      <div className='flex gap-4 flex-wrap m-4'>
        <button className='text-2xl border-2 border-gray-800 p-2 prosmotr'>Посмотреть только выполненные задачи</button>
        <button className='text-2xl border-2 border-gray-800 p-2 prosmotr_all'>Посмотреть все задачи</button>
        <button className='text-2xl border-2 border-gray-800 p-2 prosmotr_none'>Посмотреть только не выполненные задачи</button>
      </div>
      <div className="select_alls flex justify-center">
        <input type="checkbox" name="select_all" id="select_all" className='w-5 h-5 select_allss' />
        <label for="select_all" className='text-xl -mt-1 ml-2'>Выполнить все / отменить</label>
      </div>
      <ul className='flex flex-col gap-4 m-4 fff ' id='activities'>
        {arr.map(o => <li key={o.id} className='border-b-2 border-gray-800 pb-2 blocks'>
          <div className='flex gap-2 text-2xl'>
            {o.id} :
            <h1>{o.title} </h1>
          </div>
          <input className='status w-5 h-5 mt-3' name="activities[]" type="checkbox" value={o.id}
          />
        </li>)}
      </ul>
    </div>
  );
};
// Главный компонент приложения
const App = () => {
  const [id, setId] = useState(1)
  const [arr, setArr] = useState([])
  const oid = useMemo(_ => ({ id, setId }), [id])
  return (
    <main className=' flex justify-center mt-4 flex-col gap-4 m-4 fff'>
      <Form add={setArr} oid={oid} />
      <List arr={arr} />
    </main>
  );

};

export default App

