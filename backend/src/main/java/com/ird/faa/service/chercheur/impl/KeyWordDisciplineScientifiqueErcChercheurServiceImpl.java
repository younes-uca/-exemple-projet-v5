package com.ird.faa.service.chercheur.impl;

import java.util.List;
    import java.util.Date;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
    import com.ird.faa.service.util.StringUtil;
    import com.ird.faa.security.common.SecurityUtil;
    import com.ird.faa.security.bean.User;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.KeyWordDisciplineScientifiqueErc;
        import com.ird.faa.bean.KeyWord;
        import com.ird.faa.bean.DisciplineScientifiqueErc;
import com.ird.faa.dao.KeyWordDisciplineScientifiqueErcDao;
import com.ird.faa.service.chercheur.facade.KeyWordDisciplineScientifiqueErcChercheurService;
        import com.ird.faa.service.chercheur.facade.KeyWordChercheurService;
        import com.ird.faa.service.chercheur.facade.DisciplineScientifiqueErcChercheurService;

import com.ird.faa.ws.rest.provided.vo.KeyWordDisciplineScientifiqueErcVo;
import com.ird.faa.service.util.*;

    import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class KeyWordDisciplineScientifiqueErcChercheurServiceImpl extends AbstractServiceImpl<KeyWordDisciplineScientifiqueErc> implements KeyWordDisciplineScientifiqueErcChercheurService {

@Autowired
private KeyWordDisciplineScientifiqueErcDao keyWordDisciplineScientifiqueErcDao;

    @Autowired
    private ArchivableService<KeyWordDisciplineScientifiqueErc> archivableService;
        @Autowired
        private KeyWordChercheurService keyWordService ;
        @Autowired
        private DisciplineScientifiqueErcChercheurService disciplineScientifiqueErcService ;


@Autowired
private EntityManager entityManager;


@Override
public List<KeyWordDisciplineScientifiqueErc> findAll(){
    List<KeyWordDisciplineScientifiqueErc> result= new ArrayList();
    result.addAll(findAllNonArchive());
    result.addAll(findAllByOwner());
    return result;
}

        @Override
        public List<KeyWordDisciplineScientifiqueErc> findByKeyWordCode(String code){
        return keyWordDisciplineScientifiqueErcDao.findByKeyWordCode(code);
        }

        @Override
        @Transactional
        public int deleteByKeyWordCode(String code){
        return keyWordDisciplineScientifiqueErcDao.deleteByKeyWordCode(code);
        }

        @Override
        public List<KeyWordDisciplineScientifiqueErc> findByKeyWordId(Long id){
        return keyWordDisciplineScientifiqueErcDao.findByKeyWordId(id);
        }

        @Override
        @Transactional
        public int deleteByKeyWordId(Long id){
        return keyWordDisciplineScientifiqueErcDao.deleteByKeyWordId(id);
        }


        @Override
        public List<KeyWordDisciplineScientifiqueErc> findByDisciplineScientifiqueErcCode(String code){
        return keyWordDisciplineScientifiqueErcDao.findByDisciplineScientifiqueErcCode(code);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueErcCode(String code){
        return keyWordDisciplineScientifiqueErcDao.deleteByDisciplineScientifiqueErcCode(code);
        }

        @Override
        public List<KeyWordDisciplineScientifiqueErc> findByDisciplineScientifiqueErcId(Long id){
        return keyWordDisciplineScientifiqueErcDao.findByDisciplineScientifiqueErcId(id);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueErcId(Long id){
        return keyWordDisciplineScientifiqueErcDao.deleteByDisciplineScientifiqueErcId(id);
        }


@Override
public KeyWordDisciplineScientifiqueErc findById(Long id){
if(id==null) return null;
return keyWordDisciplineScientifiqueErcDao.getOne(id);
}

@Override
public KeyWordDisciplineScientifiqueErc findByIdWithAssociatedList(Long id){
    return findById(id);
}



@Transactional
public int deleteById(Long id){
int res=0;
if(keyWordDisciplineScientifiqueErcDao.findById(id).isPresent())  {
keyWordDisciplineScientifiqueErcDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public KeyWordDisciplineScientifiqueErc update(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc){
KeyWordDisciplineScientifiqueErc foundedKeyWordDisciplineScientifiqueErc = findById(keyWordDisciplineScientifiqueErc.getId());
if(foundedKeyWordDisciplineScientifiqueErc==null) return null;
else{
    archivableService.prepare(keyWordDisciplineScientifiqueErc);
return  keyWordDisciplineScientifiqueErcDao.save(keyWordDisciplineScientifiqueErc);
}
}
    private void prepareSave(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc){
        keyWordDisciplineScientifiqueErc.setDateCreation(new Date());
        if(keyWordDisciplineScientifiqueErc.getDateArchivage() == null)
        keyWordDisciplineScientifiqueErc.setDateArchivage(new Date());
                    if(keyWordDisciplineScientifiqueErc.getArchive() == null)
                keyWordDisciplineScientifiqueErc.setArchive(false);




    }

@Override
public KeyWordDisciplineScientifiqueErc save (KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc){
    prepareSave(keyWordDisciplineScientifiqueErc);



    findKeyWord(keyWordDisciplineScientifiqueErc);
    findDisciplineScientifiqueErc(keyWordDisciplineScientifiqueErc);

    return keyWordDisciplineScientifiqueErcDao.save(keyWordDisciplineScientifiqueErc);


}

@Override
public List<KeyWordDisciplineScientifiqueErc> save(List<KeyWordDisciplineScientifiqueErc> keyWordDisciplineScientifiqueErcs){
List<KeyWordDisciplineScientifiqueErc> list = new ArrayList<>();
for(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc: keyWordDisciplineScientifiqueErcs){
list.add(save(keyWordDisciplineScientifiqueErc));
}
return list;
}



@Override
@Transactional
public int delete(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc){
    if(keyWordDisciplineScientifiqueErc.getId()==null) return -1;
    KeyWordDisciplineScientifiqueErc foundedKeyWordDisciplineScientifiqueErc = findById(keyWordDisciplineScientifiqueErc.getId());
    if(foundedKeyWordDisciplineScientifiqueErc==null) return -1;
keyWordDisciplineScientifiqueErcDao.delete(foundedKeyWordDisciplineScientifiqueErc);
return 1;
}


public List<KeyWordDisciplineScientifiqueErc> findByCriteria(KeyWordDisciplineScientifiqueErcVo keyWordDisciplineScientifiqueErcVo){

String query = "SELECT o FROM KeyWordDisciplineScientifiqueErc o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",keyWordDisciplineScientifiqueErcVo.getId());
            query += SearchUtil.addConstraint( "o", "archive","=",keyWordDisciplineScientifiqueErcVo.getArchive());
        query += SearchUtil.addConstraintDate( "o", "dateArchivage","=",keyWordDisciplineScientifiqueErcVo.getDateArchivage());
        query += SearchUtil.addConstraintDate( "o", "dateCreation","=",keyWordDisciplineScientifiqueErcVo.getDateCreation());
            query += SearchUtil.addConstraintMinMaxDate("o","dateArchivage",keyWordDisciplineScientifiqueErcVo.getDateArchivageMin(),keyWordDisciplineScientifiqueErcVo.getDateArchivageMax());
            query += SearchUtil.addConstraintMinMaxDate("o","dateCreation",keyWordDisciplineScientifiqueErcVo.getDateCreationMin(),keyWordDisciplineScientifiqueErcVo.getDateCreationMax());
    if(keyWordDisciplineScientifiqueErcVo.getKeyWordVo()!=null){
        query += SearchUtil.addConstraint( "o", "keyWord.id","=",keyWordDisciplineScientifiqueErcVo.getKeyWordVo().getId());
            query += SearchUtil.addConstraint( "o", "keyWord.code","LIKE",keyWordDisciplineScientifiqueErcVo.getKeyWordVo().getCode());
    }

    if(keyWordDisciplineScientifiqueErcVo.getDisciplineScientifiqueErcVo()!=null){
        query += SearchUtil.addConstraint( "o", "disciplineScientifiqueErc.id","=",keyWordDisciplineScientifiqueErcVo.getDisciplineScientifiqueErcVo().getId());
            query += SearchUtil.addConstraint( "o", "disciplineScientifiqueErc.code","LIKE",keyWordDisciplineScientifiqueErcVo.getDisciplineScientifiqueErcVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findKeyWord(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc){
        KeyWord loadedKeyWord =keyWordService.findByIdOrCode(keyWordDisciplineScientifiqueErc.getKeyWord());

    if(loadedKeyWord==null ) {
    return;
    }
    keyWordDisciplineScientifiqueErc.setKeyWord(loadedKeyWord);
    }
    private void findDisciplineScientifiqueErc(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc){
        DisciplineScientifiqueErc loadedDisciplineScientifiqueErc =disciplineScientifiqueErcService.findByIdOrCode(keyWordDisciplineScientifiqueErc.getDisciplineScientifiqueErc());

    if(loadedDisciplineScientifiqueErc==null ) {
    return;
    }
    keyWordDisciplineScientifiqueErc.setDisciplineScientifiqueErc(loadedDisciplineScientifiqueErc);
    }

@Override
@Transactional
public void delete(List<KeyWordDisciplineScientifiqueErc> keyWordDisciplineScientifiqueErcs){
if(ListUtil.isNotEmpty(keyWordDisciplineScientifiqueErcs)){
keyWordDisciplineScientifiqueErcs.forEach(e->keyWordDisciplineScientifiqueErcDao.delete(e));
}
}
@Override
public void update(List<KeyWordDisciplineScientifiqueErc> keyWordDisciplineScientifiqueErcs){
if(ListUtil.isNotEmpty(keyWordDisciplineScientifiqueErcs)){
keyWordDisciplineScientifiqueErcs.forEach(e->keyWordDisciplineScientifiqueErcDao.save(e));
}
}




        public List<KeyWordDisciplineScientifiqueErc> findAllNonArchive(){
        String query = "SELECT o FROM KeyWordDisciplineScientifiqueErc o  WHERE o.archive != true AND o.visible = true";
        return entityManager.createQuery(query).getResultList();
        }

        public List<KeyWordDisciplineScientifiqueErc> findAllByOwner(){
        List<KeyWordDisciplineScientifiqueErc> result= new ArrayList();
        User currentUser = SecurityUtil.getCurrentUser();
        if (currentUser != null && StringUtil.isNotEmpty(currentUser.getUsername())){
        String query = "SELECT o FROM KeyWordDisciplineScientifiqueErc o  WHERE o.archive != true AND o.visible = false AND o.username = '"+ currentUser.getUsername()+"'";
        result = entityManager.createQuery(query).getResultList();
        }
        return result;
        }



    }
