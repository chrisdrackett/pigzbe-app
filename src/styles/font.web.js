import PoppinsRegular from '../../assets/fonts/PoppinsRegular.ttf';

export const loadFont = () => new Promise(resolve => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(`
        @font-face {
          font-family: "Poppins Regular";
          font-style: normal;
          font-weight: normal;
          src: url("${PoppinsRegular}") format("truetype");
        }
        `));
    document.head.appendChild(style);

    resolve();
});
