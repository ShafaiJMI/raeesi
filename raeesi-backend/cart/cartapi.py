from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .serializers import CartSerializer
from product.models import Product
from .models import Cart

@method_decorator(csrf_exempt, name='dispatch')
class CartAPI(APIView):
    renderer_classes = [JSONRenderer]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        cartitems = Cart.objects.filter(user=request.user)
        cartserializer = CartSerializer(cartitems,many=True,context={'request':request})
        return Response(cartserializer.data, status=status.HTTP_200_OK)

    def post(self,request,product_pk):
        'Add product to cart'
        user = request.user
        try:
            product = Product.objects.get(pk=product_pk)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        cart_item = Cart.objects.filter(user=user, product_id=product_pk).first()
        if cart_item:
            return Response({'message': 'Product already in cart'}, status=status.HTTP_400_BAD_REQUEST)
        cart_item = Cart.objects.create(user=user, product=product)
        cart_item.save()
        return Response({'message': 'Product added to cart successfully'}, status=status.HTTP_201_CREATED)


    def delete(self,request,product_pk):
        'Remove product from cart'
        try:
            cart_item = Cart.objects.get(pk=product_pk, user=request.user)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

        cart_item.delete()
        return Response({'message': 'Product removed from cart successfully'}, status=status.HTTP_200_OK)