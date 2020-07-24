exports.getTour = (req, res) => {
   res.status(200).render('tour', {
      title: 'Tour',
   });
};

exports.getOverview = (req, res) => {
   res.status(200).render('overview', {
      title: 'Overview',
   });
};
