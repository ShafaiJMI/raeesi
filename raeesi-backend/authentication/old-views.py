from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

@method_decorator(csrf_exempt, name='dispatch')
def signin(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

    if request.user.is_authenticated:
        return JsonResponse({"message": "Already authenticated"}, status=200)

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({"error": "Invalid email or password"}, status=400)

    user = authenticate(request, username=user.username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({"message": "Successfully logged in", "username": user.username})
    else:
        return JsonResponse({"error": "Invalid email or password"}, status=400)


@method_decorator(csrf_exempt, name='dispatch')
def signup(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

    data = json.loads(request.body)
    username = data.get("username")
    firstname = data.get("firstname", "")
    lastname = data.get("lastname", "")
    email = data.get("email")
    password = data.get("password")
    cpassword = data.get("cpassword")

    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "Username already exists"}, status=400)

    if User.objects.filter(email=email).exists():
        return JsonResponse({"error": "Email already in use"}, status=400)

    if len(username) > 15 or not username.isalnum():
        return JsonResponse({"error": "Invalid username"}, status=400)

    if password != cpassword:
        return JsonResponse({"error": "Passwords do not match"}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.first_name = firstname
    user.last_name = lastname
    user.save()

    return JsonResponse({"message": "Account created successfully"}, status=201)


@method_decorator(csrf_exempt, name='dispatch')
def signout(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

    logout(request)
    return JsonResponse({"message": "Logged out successfully"})


@method_decorator(csrf_exempt, name='dispatch')
def activate(request, uid, token):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

    try:
        user = User.objects.get(username=uid)
        # Add token validation logic here
        # For now, we assume the token is valid
        user.is_active = True
        user.save()
        return JsonResponse({"message": "Account activated successfully"})
    except User.DoesNotExist:
        return JsonResponse({"error": "Invalid user"}, status=404)


@method_decorator(csrf_exempt, name='dispatch')
def resetpassword(request, uid, token):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

    try:
        user = User.objects.get(username=uid)
        # Validate token here
        data = json.loads(request.body)
        password = data.get("password")
        user.set_password(password)
        user.save()
        return JsonResponse({"message": "Password reset successful"})
    except User.DoesNotExist:
        return JsonResponse({"error": "Invalid user"}, status=404)


@method_decorator(csrf_exempt, name='dispatch')
def changepassword(request, uid, token):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

    try:
        user = User.objects.get(username=uid)
        data = json.loads(request.body)
        oldpassword = data.get("oldpassword")
        newpassword = data.get("password")

        if user.check_password(oldpassword):
            user.set_password(newpassword)
            user.save()
            return JsonResponse({"message": "Password changed successfully"})
        else:
            return JsonResponse({"error": "Old password is incorrect"}, status=400)
    except User.DoesNotExist:
        return JsonResponse({"error": "Invalid user"}, status=404)
