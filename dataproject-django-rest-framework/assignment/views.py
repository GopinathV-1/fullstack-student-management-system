from django.shortcuts import render, redirect, get_object_or_404
from .forms import UserRegisterForm
from django.contrib import messages
from rest_framework.authtoken.models import Token


def home(request):
    return render(request, 'base.html')


def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, f'Your account has been created! You are now able to log in')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'register.html', {'form': form})


def token(request):
    token = get_object_or_404(Token, user=request.user)
    print(token)
    return render(request, 'token.html', {'token': token})
