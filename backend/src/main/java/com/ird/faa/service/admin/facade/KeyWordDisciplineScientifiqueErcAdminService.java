package com.ird.faa.service.admin.facade;

import java.util.List;
import com.ird.faa.bean.KeyWordDisciplineScientifiqueErc;
import com.ird.faa.ws.rest.provided.vo.KeyWordDisciplineScientifiqueErcVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface KeyWordDisciplineScientifiqueErcAdminService extends AbstractService<KeyWordDisciplineScientifiqueErc,Long,KeyWordDisciplineScientifiqueErcVo>{





/**
    * delete KeyWordDisciplineScientifiqueErc from database
    * @param id - id of KeyWordDisciplineScientifiqueErc to be deleted
    *
    */
    int deleteById(Long id);


    List<KeyWordDisciplineScientifiqueErc> findByKeyWordCode(String code);

    int deleteByKeyWordCode(String code);

    List<KeyWordDisciplineScientifiqueErc> findByKeyWordId(Long id);

    int deleteByKeyWordId(Long id);
    List<KeyWordDisciplineScientifiqueErc> findByDisciplineScientifiqueErcCode(String code);

    int deleteByDisciplineScientifiqueErcCode(String code);

    List<KeyWordDisciplineScientifiqueErc> findByDisciplineScientifiqueErcId(Long id);

    int deleteByDisciplineScientifiqueErcId(Long id);






    KeyWordDisciplineScientifiqueErc archiver(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc) ;
    KeyWordDisciplineScientifiqueErc desarchiver(KeyWordDisciplineScientifiqueErc keyWordDisciplineScientifiqueErc);

}
