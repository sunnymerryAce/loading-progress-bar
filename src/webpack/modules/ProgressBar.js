/**
 * @author Yoichiro Hirano
 * @description MINI 60th All Year Present
 * @created 2019/01/10
 * @link https://cp.mini.jp/mini_present/
 */
import anime from 'animejs';

export default class ProgressBar {
  constructor() {
    this.$loadingBar = document.querySelector('.progress-bar__loading');
    this.$percentage = document.querySelector('.percentage');
    this.$images = document.querySelectorAll('img');

    this.count = 0;
    this.max = this.$images.length;
    this.percentage = 0;
    this.updatedPercentage = 0;

    [...this.$images].forEach(($image) => {
      const tmpImage = new Image();
      tmpImage.onload = () => {
        this.count += 1;
        this.updatedPercentage = Math.round((100 * this.count) / this.max);
        // アニメーション
        this.progress({
          percentage: this.percentage,
          updatedPercentage: this.updatedPercentage,
        });
        this.percentage = this.updatedPercentage;
      };
      tmpImage.onerror = () => {
        this.max -= 1;
        this.updatedPercentage = Math.round((100 * this.count) / this.max);
      };
      tmpImage.src = $image.src;
    });
  }

  progress(percentage) {
    // プログレスバー
    anime.remove(this.$loadingBar);
    anime({
      targets: this.$loadingBar,
      width: {
        value: [`${this.percentage}%`, `${this.updatedPercentage}%`],
        duration: 200,
        easing: 'linear',
      },
    });

    // TODO:ロード終わってるときにアニメが並列で実行される問題
    anime.remove(percentage);
    anime({
      targets: percentage,
      percentage: percentage.updatedPercentage,
      round: 1,
      easing: 'linear',
      duration: 200,
      update: () => {
        this.$percentage.textContent = `${percentage.percentage}%`;
      },
    });
  }
}
