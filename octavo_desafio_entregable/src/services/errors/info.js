const generateUserErrorInfo = () => {
  return `Uno o más de los siguientes campos fueron completados erróneamente.
   Lista de requerimientos:
    * first_name : Necesita cadena de texto, se recibió ;
    * last_name  : Necesita cadena de texto, se recibió ;
    * email      : Necesita cadena de texto, se recibió `;
};

const iqualCode = (code) => {
  return `Código de producto ${code} existente en la base de datos`;
};

module.exports = { generateUserErrorInfo, iqualCode };
