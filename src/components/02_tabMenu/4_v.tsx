import VanillaWrapper from '../VanillaWrapper';
import cx from './cx';
import data from './data';

type TabItem = {
  id: string;
  title: string;
  description: string;
};

const buildTabItem = ({ id, title }: TabItem, index: number) => {
  const $btn = document.createElement('button');
  $btn.textContent = title;
  $btn.setAttribute('data-id', id);

  const $li = document.createElement('li');
  $li.className = cx('tab', { current: index === 0 });
  $li.append($btn);

  return $li;
};

const buildDescription = ({ description }: TabItem, index: number) => {
  const $div = document.createElement('div');
  $div.textContent = description;
  $div.className = cx('description', { current: index === 0 });

  const handleAnimationEnd = () => {
    if ($div.classList.contains(cx('exit'))) {
      $div.classList.remove(cx('exit'));
    } else if ($div.classList.contains(cx('enter'))) {
      $div.classList.replace(cx('enter'), cx('current'));
    }
  };

  $div.addEventListener('animationend', handleAnimationEnd);

  return $div;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $tabItems = data.map(buildTabItem);

  const $tabList = document.createElement('ul');
  $tabList.classList.add(cx('tabList'));
  $tabList.append(...$tabItems);

  const $description = data.map(buildDescription);
  const $tabPanel = document.createElement('div');
  $tabPanel.classList.add(cx('tabPanel'));
  $tabPanel.append(...$description);

  const $container = document.createElement('div');
  $container.classList.add(cx('container'), cx('tabMenu3-3'));
  $container.append($tabList, $tabPanel);

  const handleClickTab = (e: Event) => {
    const $el = e.target as HTMLElement;
    if ($el.localName !== 'button') return;
    const nextIndex = data.findIndex((item) => item.id === $el.dataset.id);
    $tabItems.forEach(($tab, index) => {
      const isNext = nextIndex === index;
      $tab.classList.toggle(cx('current'), isNext);
      const $desc = $description[index];

      if (isNext) {
        $desc.classList.remove(cx('current'), cx('exit'));
        $desc.classList.add(cx('enter'));
      } else if (
        $desc.classList.contains(cx('current')) ||
        $desc.classList.contains(cx('enter'))
      ) {
        $desc.classList.remove(cx('current'), cx('enter'));
        $desc.classList.add(cx('exit'));
      }
    });
  };

  $tabList.addEventListener('click', handleClickTab);
  wrapper.append($container);
};

const TabMenu4V = () => (
  <VanillaWrapper title="#4 vanillajs" initiator={initiator} />
);

export default TabMenu4V;
