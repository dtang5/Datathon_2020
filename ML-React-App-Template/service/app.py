from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
from sklearn.externals import joblib

flask_app = Flask(__name__)
app = Api(app=flask_app,
          version="1.0",
          title="ML React App",
          description="Predict results using a trained model")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params',
                  {'textField1': fields.String(required=True,
                                               description="Text Field 1",
                                               help="Text Field 1 cannot be blank"),
                   'textField2': fields.String(required=True,
                                               description="Text Field 2",
                                               help="Text Field 2 cannot be blank"),
                   'textField3': fields.Integer(required=True,
                                                description="Text Field 3",
                                                help="Text Field 3 cannot be blank"),
                   'textField4': fields.Integer(required=True,
                                                description="Text Field 4",
                                                help="Text Field 4 cannot be blank"),
                   'textField5': fields.Integer(required=True,
                                                description="Text Field 5",
                                                help="Text Field 5 cannot be blank")})

# classifier = joblib.load('classifier.joblib')


@name_space.route("/")
class MainClass(Resource):

    def options(self):
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response

    @app.expect(model)
    def post(self):
        try:
            formData = request.json
            print(formData)
            data = [val for val in formData.values()]
            # prediction = classifier.predict(data)
            response = jsonify({
                "statusCode": 200,
                "status": "Prediction made",
                "result": "Prediction: " + str(data)
            })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        except Exception as error:
            return jsonify({
                "statusCode": 500,
                "status": "Could not make prediction",
                "error": str(error)
            })
