from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status 
import pandas as pd
from sklearn.linear_model import LinearRegression 

class PredictView(APIView): 
    def post(self, request): 
        # Extract input values from request 
        i1 = request.data.get('i1') 
        i2 = request.data.get('i2') 
        i3 = request.data.get('i3') 
        i4 = request.data.get('i4') 
        i5 = request.data.get('i5')     
        # Check if any value is None 
        if None in [i1, i2, i3, i4, i5]: 
            return Response({'error': 'One or more values are missing'}, status=status.HTTP_400_BAD_REQUEST) 
        # Convert values to float 
        try: 
            i1 = float(i1) 
            i2 = float(i2) 
            i3 = float(i3) 
            i4 = float(i4) 
            i5 = float(i5) 
        except ValueError: 
            return Response({'error': 'One or more values are not valid numbers'}, status=status.HTTP_400_BAD_REQUEST) 
        # Load the trained model and preprocess data 
        data = pd.read_csv('C:\\Users\\harim\\OneDrive\\harish\\ml_opps\\backend\\PARIS PRICE.dataset.csv')  # Update with your file path  
        x = data.iloc[:, [0, 1, 2, 3, 4]] 
        y = data.iloc[:, -1] 
        # Train the model 
        rg = LinearRegression() 
        rg.fit(x, y) 
        # Make predictions 
        prediction = rg.predict([[i1, i2, i3, i4, i5]])[0]
        # Return the prediction 
        return Response({'prediction':prediction}, status=status.HTTP_200_OK)
