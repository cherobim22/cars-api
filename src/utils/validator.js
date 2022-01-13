const validator = async (validate = [], keys = []) => {
  let errors = [];
  let difference = validate.filter((x) => !keys.includes(x));

  difference.forEach((e) => {
    errors.push("Especifique o campo " + e);
  });

  return errors;
};

module.exports = validator;
