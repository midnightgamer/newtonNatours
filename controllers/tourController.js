const fs = require('fs');

let tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../dev-data/data/tours-simple.json`
    )
);

exports.getAllTours = (req, res) => {
    res.json({
        status: 200,
        results: tours.length,
        data: { tours },
    });
};

exports.getSingleTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id',
        });
    }

    res.json({
        status: 200,
        data: { tour },
    });
};

exports.addTour = (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;

    const newTours = Object.assign(
        { id: newId },
        req.body
    );
    tours.push(newTours);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).send({
                status: '200',
                data: {
                    tours: newTours,
                },
            });
        }
    );
};

exports.updateTour = (req, res) => {
    const id = req.params.id * 1;
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id',
        });
    }

    res.json({
        status: 200,
        data: { tour: '<Updated tour.....>' },
    });
};

exports.deleteTour = (req, res) => {
    const id = req.params.id * 1;
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id',
        });
    }

    res.json({
        status: 204,
        data: null,
    });
};
