import ReactiveTextBox1 from './1_r';
import ReactiveTextBox2 from './2_r';
import ReactiveTextBox3 from './3_r';
import ReactiveTextBox4V from './4_v';
import cx from './cx';

const ReactiveTextBoxes = () => {
  return (
    <div className={cx('ReactiveTextBoxes')}>
      <h2>반응형 텍스트박스</h2>
      <ReactiveTextBox1 />
      <ReactiveTextBox2 />
      <ReactiveTextBox3 />
      <ReactiveTextBox4V />
    </div>
  );
};

export default ReactiveTextBoxes;
