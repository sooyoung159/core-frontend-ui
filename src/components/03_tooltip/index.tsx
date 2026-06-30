import cx from './cx';
import Tooltip1 from './1_r';
import Tooltip2_1 from './2-1_r';
import Tooltip2_2 from './2_2_r';
import Tooltip2_3 from './2-3_r';
import Tooltip3 from './3_r';
import Tooltip4 from './4_r';
import Tooltip5V from './5_v';

const Tooltips = () => {
  return (
    <div className={cx('Tooltips')}>
      <h2>툴팁</h2>
      <Tooltip1 />
      <Tooltip2_1 />
      <Tooltip2_2 />
      <Tooltip2_3 />
      <Tooltip3 />
      <Tooltip4 />
      <Tooltip5V />
    </div>
  );
};

export default Tooltips;
