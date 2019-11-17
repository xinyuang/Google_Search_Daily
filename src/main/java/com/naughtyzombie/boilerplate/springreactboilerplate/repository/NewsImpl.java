//package com.naughtyzombie.boilerplate.springreactboilerplate.repository;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import javax.persistence.criteria.CriteriaBuilder;
//import javax.persistence.criteria.CriteriaQuery;
//import javax.persistence.criteria.Root;
//
//import org.hibernate.Session;
//import org.hibernate.SessionFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
//
//import com.naughtyzombie.boilerplate.springreactboilerplate.model.News;
//
//@Repository
//public class NewsImpl implements NewsRepository{
//
//	@Autowired
//	private SessionFactory sessionFactory;
//	
//	public News getNewsById(int newsId) {
//		// TODO Auto-generated method stub
//		News news = null;
//		try (Session session = sessionFactory.openSession()) {
//			session.beginTransaction();
//			news = (News) session.get(News.class, newsId);
//			session.getTransaction().commit();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return news;
//	}
//
//	public void deleteNews(int newsId) {
//		// TODO Auto-generated method stub
//		Session session = null;
//		try {
//			session = sessionFactory.openSession();
//			session.beginTransaction();
//			News product = (News) session.get(News.class, newsId);
//			session.delete(product);
//			session.getTransaction().commit();
//		} catch (Exception e) {
//			e.printStackTrace();
//			session.getTransaction().rollback();
//		} finally {
//			if (session != null) {
//				session.close();
//			}
//		}		
//	}
//
//	public News addNews(News news) {
//		// TODO Auto-generated method stub
//		Session session = null;
//		try {
//			session = sessionFactory.openSession();
//			session.beginTransaction();
//			session.save(news);
//			session.getTransaction().commit();
//		} catch (Exception e) {
//			e.printStackTrace();
//			session.getTransaction().rollback();
//		} finally {
//			if (session != null) {
//				session.close();
//			}
//		}	
//		return news;
//	}
//
//	public void updateNews(News news) {
//		// TODO Auto-generated method stub
//		Session session = null;
//		try {
//			session = sessionFactory.openSession();
//			session.beginTransaction();
//			session.saveOrUpdate(news);
//			session.getTransaction().commit();
//		} catch (Exception e) {
//			e.printStackTrace();
//			session.getTransaction().rollback();
//		} finally {
//			if (session != null) {
//				session.close();
//			}
//		}
//	}
//
//	public List<News> getAllNews() {
//		// TODO Auto-generated method stub
//		List<News> news = new ArrayList<News>();
//		try (Session session = sessionFactory.openSession()) {
//			session.beginTransaction();
//			CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
//			CriteriaQuery<News> criteriaQuery = criteriaBuilder.createQuery(News.class);
//			Root<News> root = criteriaQuery.from(News.class);
//			criteriaQuery.select(root);
//			news = session.createQuery(criteriaQuery).getResultList();
//			session.getTransaction().commit();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//		return news;
//	}
//	
//}
