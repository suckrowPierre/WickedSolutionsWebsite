export {isMobileOrNarrow, resizeOrLoadCheck};

const isMobileOrNarrow = (minScreenWidth: number) => {
    const condition = `window.innerWidth < ${minScreenWidth} || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)`;
    return `
    js
    function isMobileOrNarrow() {
    return ${condition};
    }
    end
    `;
}

const resizeOrLoadCheck = "on resize from window or load";
