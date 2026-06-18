import cx from './cx';
import Tooltip1 from './1_r';
import Tooltip2_1 from './2-1_r';
import Tooltip2_2 from './2_2_r';
import Tooltip2_3 from './2-3_r';

const Tooltips = () => {
  return (
    <div className={cx('Tooltips')}>
      <h2>툴팁</h2>
      <Tooltip1 />
      <Tooltip2_1 />
      <Tooltip2_2 />
      <Tooltip2_3 />
    </div>
  );
};

export default Tooltips;
