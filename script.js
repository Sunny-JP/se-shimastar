/* ===================
アコーディオン details/summary
====================== */
const ANIMATION_TIME = 300;
const OFFSET_TIME = 20;

document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".detail");
  accordions.forEach((accordion) => {
    let isAnimating = false; // アニメーション中かどうかを示すフラグ

    const title = accordion.querySelector(".summary");
    const content = accordion.querySelector(".update-contents");

    title.addEventListener("click", (e) => {
      e.preventDefault();

      // アニメーション中はリターン（連打防止）
      if (isAnimating) return;

      // オープン処理
      if (!accordion.open) {
        isAnimating = true; // アニメーション中（オープン時のみでも安定する）
        accordion.open = true; // コンテンツの高さを取得するためopen属性をセット
        const contentHeight = content.offsetHeight;

        // アニメーションを安定させるために遅延
        setTimeout(() => {
          content.style.maxHeight = `${contentHeight}px`; // コンテンツを元の高さに設定
          accordion.classList.add("is-open"); // オープンクラスを追加

          // アニメーション完了後にリセット
          setTimeout(() => {
            content.removeAttribute("style");
            isAnimating = false; // アニメーション解除
          }, ANIMATION_TIME);
        }, OFFSET_TIME);

        // クローズ処理
      } else if (accordion.open) {
        const contentHeight = content.offsetHeight;

        // コンテンツを元の高さに設定
        content.style.maxHeight = `${contentHeight}px`;

        // アニメーションを安定させるために遅延
        setTimeout(() => {
          accordion.classList.remove("is-open");

          // アニメーション完了後にリセット
          setTimeout(() => {
            content.removeAttribute("style");
            accordion.open = false; // open属性を削除
          }, ANIMATION_TIME);
        }, OFFSET_TIME);
      }
    });

    // open属性に合わせてis-openクラスを同期
    function syncOpenState() {
      const hasOpenClass = accordion.classList.contains("is-open");

      if (accordion.open && !hasOpenClass) {
        // open属性がある時はis-openクラスを追加
        accordion.classList.add("is-open");
      } else if (!accordion.open && hasOpenClass) {
        // open属性がない時はis-openクラスを削除
        accordion.classList.remove("is-open");
      }
    }

    // 読み込み時に同期
    syncOpenState();

    // ページ内検索で自動開閉させるために同期
    accordion.addEventListener("toggle", () => {
      setTimeout(() => {
        // クリックした場合でもトグルイベントが発生するため遅延時間を合わせる
        syncOpenState();
      }, OFFSET_TIME);
    });
  });
});