from django.urls import path
from . import views

app_name = "statics"
urlpatterns = [
    path('init/', views.InitialReview.as_view()),
    path('notice/', views.Notice.as_view()),
    path('notice/check/', views.NoticeCheck.as_view()),
    path('following/list/', views.Following.as_view()),
    path('follower/list/', views.Follower.as_view()),
    path('review/', views.Review.as_view()),
    path('like/', views.Like.as_view()),
]
